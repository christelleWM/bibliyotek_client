
import Loader from 'react-loader-spinner';

const LoadingSpinner = () =>{
    return(
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Loader type="Oval" color="#00BFFF" height="50" width="50" />
      </div>
    );
}
export default LoadingSpinner;
