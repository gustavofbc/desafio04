import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';

interface modalAddFoodProps {
  handleAddFood: (data: any) => void,
  setIsOpen: () => void,
  isOpen: boolean
}

export function ModalAddFood({ handleAddFood, setIsOpen, isOpen }: modalAddFoodProps) {
  // class ModalAddFood extends Component {
  // constructor(props) {
  //   super(props);

  //   this.formRef = createRef();
  // }
  const formRef = useRef(null);


  async function handleSubmit(data: any) {
    // const { setIsOpen, handleAddFood } = this.props;

    handleAddFood(data);
    setIsOpen();
  };

  // render() {
  //   const { isOpen, setIsOpen } = this.props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
// };

// export default ModalAddFood;
