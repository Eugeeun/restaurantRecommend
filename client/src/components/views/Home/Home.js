import React, { useState, useEffect } from 'react';
import { setCurrPosition, setNearRestaurants } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';

const { kakao } = window;

const exceptedCategory = [
  '간식',
  '제과',
  '베이커리',
  '술집',
  '뷔페',
  '죽',
  '회',
];

function Home() {
  const [selected, setSelected] = useState({});
  const reducers = useSelector((state) => state);
  const dispatch = useDispatch();

  const container = document.getElementById('map');
  const dialog = document.querySelector('dialog');
  let map;
  let marker;

  const filterCategory = (restaurant) => {
    let flag = false;
    exceptedCategory.forEach((category) => {
      if (restaurant.category_name.includes(category)) {
        flag = true;
        return;
      }
    });
    return flag;
  };

  const getNearRestaurants = (latitude, longitude) => {
    let places = new kakao.maps.services.Places();
    let restaurants = [];

    places.categorySearch(
      'FD6',
      (result, status, pagination) => {
        restaurants.push(
          ...result.filter((restaurant) => !filterCategory(restaurant))
        );

        pagination.hasNextPage
          ? pagination.nextPage()
          : dispatch(setNearRestaurants(restaurants));
      },
      {
        y: latitude,
        x: longitude,
        radius: 1000,
      }
    );
  };

  const getCurPos = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch(
        setCurrPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      );
      getNearRestaurants(pos.coords.latitude, pos.coords.longitude);
    });
  };

  const setNearData = () => {
    getCurPos();
  };

  const markRestaurant = (restaurant) => {
    const markerPos = new kakao.maps.LatLng(restaurant.y, restaurant.x);
    marker = new kakao.maps.Marker({
      position: markerPos,
    });
    marker.setMap(map);
  };

  const markRestaurants = () => {
    reducers.restaurants.forEach(markRestaurant);
  };

  const restaurantRecommend = () => {
    const restaurant =
      reducers.restaurants[
        Math.floor(Math.random() * reducers.restaurants.length)
      ];
    markRestaurant(restaurant, map);
    setSelected(restaurant);
    dialog.showModal();
  };

  const onClicks = () => {
    console.log(selected);
    dialog.showModal();
  };

  const linkTo = () => {
    window.location.href = `https://map.kakao.com/link/to/${selected.id}`;
  };

  useEffect(() => {
    getCurPos();
  }, []);

  if (reducers.position.latitude > 0) {
    const options = {
      center: new kakao.maps.LatLng(
        reducers.position.latitude,
        reducers.position.longitude
      ),
      level: 4,
    };
    map = new kakao.maps.Map(container, options);

    const markerPos = new kakao.maps.LatLng(
      reducers.position.latitude,
      reducers.position.longitude
    );
    const marker = new kakao.maps.Marker({
      position: markerPos,
    });
    marker.setMap(map);
  }

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>오늘 뭐 먹지?</h2>
        <button className={styles.name} onClick={onClicks}>
          이름
        </button>
      </div>
      <section id="map" className={styles.map}></section>
      <div className={styles.mapUpdateBtn}>
        <button className={styles.recommend} onClick={setNearData}>
          내 위치
        </button>
        <button className={styles.recommend} onClick={markRestaurants}>
          주변 식당
        </button>
        <button className={styles.recommend} onClick={restaurantRecommend}>
          추천해줘
        </button>
        <dialog>
          <h1>{selected.place_name}</h1>
          <h2>{selected.distance}미터 떨어짐</h2>
          <button onClick={linkTo}>길찾기</button>
        </dialog>
      </div>
    </div>
  );
}

export default Home;
