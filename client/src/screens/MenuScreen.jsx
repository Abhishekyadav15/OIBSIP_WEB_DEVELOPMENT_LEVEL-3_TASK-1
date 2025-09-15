import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Thunks
import { listPizzas } from '../redux/asyncThunks/pizzaThunks';
import { getUserDetails } from '../redux/asyncThunks/userThunks';

// Components
import VerficationModal from '../components/ui/Auth/VerficationModal';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import PizzaList from '../components/ui/PizzaMenu/PizzaList';

function MenuScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const { userDetails } = useSelector(state => state.user);
  const { loading, pizzaList, pizzaListError } = useSelector(state => state.pizza);

  // Fetch user details once
  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails());
    }
  }, [dispatch, userDetails]);

  // Fetch pizzas once
  useEffect(() => {
    if (!pizzaList || pizzaList.length === 0) {
      dispatch(listPizzas());
    }
  }, [dispatch]);

  // Show verification modal if user not verified
  useEffect(() => {
    if (userDetails && !userDetails.isVerified) {
      setModalVisible(true);
    }
  }, [userDetails]);

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center pt-14 px-10 sm:px-16 bg-orange-200 w-full">
        {loading ? (
          <Loader />
        ) : pizzaListError ? (
          <Message>{pizzaListError}</Message>
        ) : pizzaList && pizzaList.length > 0 ? (
          <>
            <div className="w-full flex flex-row items-center justify-between my-4">
              <h1 className="text-4xl font-bold text-orange-600">Pizza Menu</h1>
              {userDetails && (
                <Link to="/custom-pizza">
                  <Button variant="primary" className="rounded-full font-bold">
                    Create Custom Pizza
                  </Button>
                </Link>
              )}
            </div>
            <PizzaList pizzaList={pizzaList} />
          </>
        ) : (
          <div className="text-4xl font-bold text-orange-600">No Pizzas Found!</div>
        )}
      </section>

      {modalVisible && (
        <VerficationModal onClose={() => setModalVisible(false)} />
      )}
    </>
  );
}

export default MenuScreen;
