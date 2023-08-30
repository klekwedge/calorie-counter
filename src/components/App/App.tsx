/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
// import { formatInput } from '../../utils/index.js';
import Result from '../Result/Result';


type Activity = 'min' | 'low' | 'medium' | 'high' | 'max';

type ActivityConstant = {
  [index in Activity]: number;
};

const PhysicalActivityRatio: ActivityConstant = {
  min: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.725,
  max: 1.9,
};

const CaloriesFormulaFactor = {
  AGE: 5,
  WEIGHT: 10,
  HEIGHT: 6.25,
};

type Genre = 'male' | 'female';

type GenreConstant = {
  [index in Genre]: number;
};

const CaloriesFormulaConstant: GenreConstant = {
  male: 5,
  female: -160,
};

const CaloriesMinMaxRatio = {
  min: 0.85,
  msx: 1.15,
};

function App() {
  const [gender, setGender] = useState<Genre>('male');
  const [activity, setActivity] = useState<Activity>('min');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [min, setMin] = useState(0);
  const [middle, setMiddle] = useState(0);
  const [max, setMax] = useState(0);

  const reset = () => {
    setGender('male');
    setActivity('min');
    setAge('');
    setHeight('');
    setWeight('');

    setMin(0);
    setMiddle(0);
    setMax(0);
  };

  const calc = () => {
    console.log('!');

    const getCaloriesNorm = () => {
      const ageResult = CaloriesFormulaFactor.AGE * +age;
      const weightResult = CaloriesFormulaFactor.WEIGHT * +weight;
      const heightResult = CaloriesFormulaFactor.HEIGHT * +height;
      const genderResult = CaloriesFormulaConstant[gender];
      const activityResult = PhysicalActivityRatio[activity];

      return Math.round((weightResult + heightResult - ageResult + genderResult) * activityResult);
    };

    const res = getCaloriesNorm();

    setMiddle(res);
    setMin(Math.round(res * CaloriesMinMaxRatio.min));
    setMax(Math.round(res * CaloriesMinMaxRatio.msx));
  };

  const isFormFill = () => gender && age && height && weight && activity;

  return (
    <main className="main">
      <div className="container">
        <article className="counter">
          <h1 className="counter__heading heading-main">Счётчик калорий</h1>
          <div className="counter__form form">
            <div className="form__item">
              <h2 className="heading">Пол</h2>
              <ul className="switcher">
                <li className="switcher__item">
                  <input
                    onClick={() => setGender('male')}
                    id="gender-male"
                    name="gender"
                    value="male"
                    type="radio"
                    checked={gender === 'male'}
                    required
                  />
                  <label htmlFor="gender-male">Мужчина</label>
                </li>
                <li className="switcher__item">
                  <input
                    onClick={() => setGender('female')}
                    id="gender-female"
                    name="gender"
                    value="female"
                    type="radio"
                    required
                    checked={gender === 'female'}
                  />
                  <label htmlFor="gender-female">Женщина</label>
                </li>
              </ul>
            </div>
            <fieldset className="form__item form__parameters" name="parameters">
              <legend className="visually-hidden">Физические параметры</legend>
              <div className="inputs-group">
                <div className="input">
                  <div className="input__heading">
                    <label className="heading" htmlFor="age">
                      Возраст
                    </label>
                    <span className="input__heading-unit">лет</span>
                  </div>
                  <div className="input__wrapper">
                    <input
                      value={age}
                      onInput={(e) => {
                        if (age.length <= 2) {
                          const target = e.nativeEvent.target as HTMLInputElement;
                          setAge(target.value);
                        }
                      }}
                      type="number"
                      id="age"
                      name="age"
                      placeholder="0"
                      inputMode="decimal"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <div className="input">
                  <div className="input__heading">
                    <label className="heading" htmlFor="height">
                      Рост
                    </label>
                    <span className="input__heading-unit">см</span>
                  </div>
                  <div className="input__wrapper">
                    <input
                      value={height}
                      onInput={(e) => {
                        if (height.length <= 2) {
                          const target = e.nativeEvent.target as HTMLInputElement;
                          setHeight(target.value);
                        }
                      }}
                      type="number"
                      id="height"
                      name="height"
                      placeholder="0"
                      inputMode="decimal"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <div className="input">
                  <div className="input__heading">
                    <label className="heading" htmlFor="weight">
                      Вес
                    </label>
                    <span className="input__heading-unit">кг</span>
                  </div>
                  <div className="input__wrapper">
                    <input
                      value={weight}
                      onInput={(e) => {
                        if (weight.length <= 2) {
                          const target = e.nativeEvent.target as HTMLInputElement;
                          setWeight(target.value);
                        }
                      }}
                      type="number"
                      id="weight"
                      name="weight"
                      placeholder="0"
                      inputMode="decimal"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset className="form__item">
              <legend className="heading">Физическая активность</legend>
              <ul className="radios-group">
                <li className="radio">
                  <div className="radio__wrapper">
                    <input
                      id="activity-minimal"
                      name="activity"
                      value="min"
                      checked={activity === 'min'}
                      onChange={() => setActivity('min')}
                      type="radio"
                      required
                    />
                    <label htmlFor="activity-minimal">Минимальная</label>
                  </div>
                  <p className="radio__description">Сидячая работа и нет физических нагрузок</p>
                </li>
                <li className="radio">
                  <div className="radio__wrapper">
                    <input
                      id="activity-low"
                      name="activity"
                      checked={activity === 'low'}
                      onChange={() => setActivity('low')}
                      type="radio"
                      required
                    />
                    <label htmlFor="activity-low">Низкая</label>
                  </div>
                  <p className="radio__description">Редкие, нерегулярные тренировки, активность в быту</p>
                </li>
                <li className="radio">
                  <div className="radio__wrapper">
                    <input
                      id="activity-medium"
                      name="activity"
                      value="medium"
                      checked={activity === 'medium'}
                      onChange={() => setActivity('medium')}
                      type="radio"
                      required
                    />
                    <label htmlFor="activity-medium">Средняя</label>
                  </div>
                  <p className="radio__description">Тренировки 3-5 раз в неделю</p>
                </li>
                <li className="radio">
                  <div className="radio__wrapper">
                    <input
                      id="activity-high"
                      name="activity"
                      checked={activity === 'high'}
                      onChange={() => setActivity('high')}
                      type="radio"
                      required
                    />
                    <label htmlFor="activity-high">Высокая</label>
                  </div>
                  <p className="radio__description">Тренировки 6-7 раз в неделю</p>
                </li>
                <li className="radio">
                  <div className="radio__wrapper">
                    <input
                      id="activity-maximal"
                      name="activity"
                      checked={activity === 'max'}
                      onChange={() => setActivity('max')}
                      type="radio"
                      required
                    />
                    <label htmlFor="activity-maximal">Очень высокая</label>
                  </div>
                  <p className="radio__description">Больше 6 тренировок в неделю и физическая работа</p>
                </li>
              </ul>
            </fieldset>
            <div className="form__submit">
              <button className="form__submit-button button" disabled={!isFormFill()} onClick={calc}>
                Рассчитать
              </button>
              <button className="form__reset-button" disabled={!isFormFill()} onClick={reset}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FD3636" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.4143 12.0002L18.7072 6.70725C19.0982 6.31625 19.0982 5.68425 18.7072 5.29325C18.3162 4.90225 17.6842 4.90225 17.2933 5.29325L12.0002 10.5862L6.70725 5.29325C6.31625 4.90225 5.68425 4.90225 5.29325 5.29325C4.90225 5.68425 4.90225 6.31625 5.29325 6.70725L10.5862 12.0002L5.29325 17.2933C4.90225 17.6842 4.90225 18.3162 5.29325 18.7072C5.48825 18.9022 5.74425 19.0002 6.00025 19.0002C6.25625 19.0002 6.51225 18.9022 6.70725 18.7072L12.0002 13.4143L17.2933 18.7072C17.4882 18.9022 17.7443 19.0002 18.0002 19.0002C18.2562 19.0002 18.5122 18.9022 18.7072 18.7072C19.0982 18.3162 19.0982 17.6842 18.7072 17.2933L13.4143 12.0002Z"
                  />
                </svg>
                <span>Очистить поля и расчёт</span>
              </button>
            </div>
          </div>
          <Result min={min} middle={middle} max={max} />
        </article>
      </div>
    </main>
  );
}

export default App;
