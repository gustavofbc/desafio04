import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodProps {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string,
}

interface EditingFoodProps {
  id: number,
  name: string,
  description: string,
  price: number,
  available: boolean,
  image: string,
}

// class Dashboard extends Component {
export function Dashboard() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<EditingFoodProps>({} as EditingFoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // async function componentDidMount() {
  //   const response = await api.get('/foods');

  // this.setState({ foods: response.data });
  //   setFoods(response.data);
  // }

  useEffect(() => {
    api.get('/foods').then((response => {
      setFoods(response.data);
    }));
  }, [])

  async function handleAddFood(food: FoodProps) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods, response.data])
      // this.setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodProps) {
    // const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      // this.setState({ foods: foodsUpdated });
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    // const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    // this.setState({ foods: foodsFiltered });
    setFoods(foodsFiltered);
  }

  function toggleModal() {
    // const { modalOpen } = this.state;

    // this.setState({ modalOpen: !modalOpen });
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    // const { editModalOpen } = this.state;

    // this.setState({ editModalOpen: !editModalOpen });
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodProps) {
    setEditingFood(food);
    setEditModalOpen(!editModalOpen);
    // this.setState({ editingFood: food, editModalOpen: true });
  }

  // render() {
  // const { modalOpen, editModalOpen, editingFood, foods } = this.state;

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
// };

export default Dashboard;
