import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function Courses() {
  const auth = useContext(AuthContext);
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    fetch('/api/course', {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
      signal: abortController.signal,
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not OK.');
      })
      .then(({ courses }) => setCourses(courses))
      .catch((error) => setError(error.message));

    fetch('/api/admin', {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
      signal: abortController.signal,
    })
      .then((response) => {
        if (response.ok) return response.text();
        throw new Error('Network response was not OK.');
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.message));

    return () => {
      abortController.abort();
    };
  }, [auth]);

  return (
    <div>
      <h1>Courses</h1>
      {courses && (
        <ul>
          {courses.map((course) => (
            <li style={{ display: 'block' }} key={course.id}>
              {course.name}
            </li>
          ))}
        </ul>
      )}
      {!courses && error && <p>{error}</p>}
    </div>
  );
}

export default Courses;
