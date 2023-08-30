interface ResultProps {
  min: number;
  middle: number;
  max: number;
}

function Result({ min, middle, max }: ResultProps) {
  return (
    <section className="counter__result counter__result">
      <h2 className="heading">Ваша норма калорий</h2>
      <ul className="counter__result-list">
        <li className="counter__result-item">
          <h3>
            <span id="calories-norm">{middle}</span> ккал
          </h3>
          <p>поддержание веса</p>
        </li>
        <li className="counter__result-item">
          <h3>
            <span id="calories-minimal">{min}</span> ккал
          </h3>
          <p>снижение веса</p>
        </li>
        <li className="counter__result-item">
          <h3>
            <span id="calories-maximal">{max}</span> ккал
          </h3>
          <p>набор веса</p>
        </li>
      </ul>
    </section>
  );
}

export default Result;
