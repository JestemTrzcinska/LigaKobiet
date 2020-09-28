import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// var request = new XMLHttpRequest();
// request.addEventListener(
//   'load',
//   function (evt) {
//     console.log(evt);
//   },
//   false
// );
// request.open('GET', 'http://kobiecapilka.pl/', true);
// request.send();

const News = ({ getGame, game }) => {
  return (
    <div className='beginning'>
      <h4>News</h4>News
    </div>
  );
};

News.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(News);

// import React from 'react';
// import { Col } from 'react-bootstrap';
// import Calendar from './Calendar';
// import Legend from './Legend';

// const Schedule = () => {
//   return (
//     <div className='logowanie1'>
//       <div className='logowanie2'>
//         <div className='logowanie3'>
//           <Col>
//             <Calendar />
//           </Col>
//           <Col className='topp'>
//             <Legend />
//           </Col>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;
