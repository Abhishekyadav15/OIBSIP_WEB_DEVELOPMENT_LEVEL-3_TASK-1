import PropTypes from 'prop-types';
import PizzaItem from './PizzaItem';

function PizzaList({ pizzaList }) {
  if (!pizzaList || pizzaList.length === 0) {
    return <p className="text-xl text-center mt-8">No pizzas found!</p>;
  }

  // Separate admin and user pizzas
  const adminPizzas = pizzaList.filter(pizza => pizza.createdBy === 'admin');
  const userPizzas = pizzaList.filter(pizza => pizza.createdBy === 'user');

  return (
    <div className="w-full">
      {adminPizzas.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Pizzas by Admin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminPizzas.map(pizza => (
              <PizzaItem key={pizza._id} pizza={pizza} />
            ))}
          </div>
        </div>
      )}

      {userPizzas.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Custom Pizzas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPizzas.map(pizza => (
              <PizzaItem key={pizza._id} pizza={pizza} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

PizzaList.propTypes = {
  pizzaList: PropTypes.array.isRequired,
};

export default PizzaList;
