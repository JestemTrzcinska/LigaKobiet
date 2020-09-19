import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGames } from '../../actions/game';
import Spinner from '../layout/Spinner';
import GameItem from '../edit-data/games/GameItem';
import Moment from 'react-moment';

const moment = require('moment');

function getDaysArray(year, month) {
  var numDaysInMonth, daysIndex, index, i, l, daysArray;

  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  daysIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  index = daysIndex[new Date(year, month - 1, 1).toString().split(' ')[0]];
  daysArray = [day];

  for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
    daysArray.push(i + 1);
    if (index == 7) index = 0;
  }

  return daysArray;
}

const Schedule = ({ getGames, game: { games, loading } }) => {
  const AddingEventToADay = () => {
    getDaysArray(moment().format('YYYY'), moment().format('M')).map(
      (day, i) => {
        games.map((game) => {
          if (
            moment().format('M') == moment(game.date).format('M') &&
            moment().format('YYYY') == moment(game.date).format('YYYY') &&
            day == moment(game.date).format('D')
          ) {
            console.log(moment(game.date).format('D M YYYY'));
          } else {
            console.log('nie ma meczy w tym miesiącu lub/i roku');
          }
        });
      }
    );
  };
  useEffect(() => {
    getGames();
  }, [getGames]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <h1 className='large text-primary'>Harmonogram</h1>
            {/* {games.length > 0 ? AddingEventToADay() : null} */}
            {/* loop */}
            {games.length > 0 ? (
              //  getDaysArray(moment().format('YYYY'), moment().format('M'),
              games.map((game) => <GameItem key={game._id} game={game} />)
            ) : (
              <h4>Nie znaleziono meczy</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Schedule.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(Schedule);

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
