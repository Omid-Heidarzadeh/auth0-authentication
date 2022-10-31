import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavigateTo(props) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(props.to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default NavigateTo;
