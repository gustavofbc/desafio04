import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

interface FoodProps {
  products: {
    id: number,
    name: string,
    description: string,
    price: number,
    available: boolean,
    image: string,
  }
  handleEditFood: (food: any) => void,
  handleDelete: (id: number) => void
}

export function Food({ products, handleEditFood, handleDelete }: FoodProps) {

  const [isAvailable, setIsAvailable] = useState(products.available);

  // class Food extends Component {
  //   constructor(props) {
  //     super(props);

  //     const { available } = this.props.food;
  //     this.state = {
  //       isAvailable: available
  //     };
  //   }

  async function toggleAvailable() {
    const food = products;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
    // this.setState({ isAvailable: !isAvailable });
  }

  function setEditingFood() {
    const food = products;

    handleEditFood(food);
  }

  // function render() {
  //   const { isAvailable } = this.state;
  //   const { food, handleDelete } = this.props;

  return (
    <Container available={isAvailable}>
      <header>
        <img src={products.image} alt={products.name} />
      </header>
      <section className="body">
        <h2>{products.name}</h2>
        <p>{products.description}</p>
        <p className="price">
          R$ <b>{products.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${products.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(products.id)}
            data-testid={`remove-food-${products.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${products.id}`} className="switch">
            <input
              id={`available-switch-${products.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${products.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
// };
