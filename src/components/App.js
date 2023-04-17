import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import InfoTooltip from "./InfoTooltip";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });

  useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        auth
          .getContent(token)
          .then((res) => {
            let email = res.data.email;
            handleLogin({ email });
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    tokenCheck();
  }, []);

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserData(email);
  };

  function onLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        handleLogin({ email });
        navigate("/");
      })
      .catch(() => {
        setLoggedIn(false);
        setInfoTooltipOpen(true);
      });
  }

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setLoggedIn(true);
        setInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch(() => {
        setLoggedIn(false);
        setInfoTooltipOpen(true);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUser(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setDeleteConfirmationOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImageOpen ||
    isDeleteConfirmationOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={setEditAvatarPopupOpen}
                onEditProfile={setEditProfilePopupOpen}
                onAddPlace={setAddPlacePopupOpen}
                cards={cards}
                onCardClick={{ setSelectedCard, setIsImageOpen }}
                onCardLike={handleCardLike}
                onDeleteClick={setDeleteConfirmationOpen}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={onLogin} />}
            loggedIn={loggedIn}
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
            loggedIn={loggedIn}
          />
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "sign-in"} />}
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImageOpen}
          onClose={closeAllPopups}
        />

        <PopupWithConfirmation
          card={selectedCard}
          isOpen={isDeleteConfirmationOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onCardDelete={handleCardDelete}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          loggedIn={loggedIn}
          onClose={closeAllPopups}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
