import FadeLoader from 'react-spinners/FadeLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <div>
      <FadeLoader
        color='black'
        cssOverride={override}
        loading={loading}
        size={300}
      />
    </div>
  );
};

export default Spinner;
