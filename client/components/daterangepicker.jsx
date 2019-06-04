import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

const styles = theme => ({
  root: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  marginTop: {
    marginTop: theme.spacing()
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: -17
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20
  },
  paddingLeft: {
    paddingLeft: 20
  }
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
    this.selectedDate = [new Date()];
    this.setDate = this.setDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setDate(date) {
    let dateArray = defaultMultipleDateInterpolation(date, this.state.dates);
    this.setState({
      dates: dateArray
    });
  }
  handleSubmit() {
    this.state.dates.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    console.log(this.state.dates);
    this.props.close();
  }
  componentDidMount() {
    const dateArray = this.selectedDate.concat(this.state.dates);
    this.setState({
      dates: dateArray
    });
  }
  render() {
    const MultipleDatesCalendar = withMultipleDates(Calendar);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid justify="center" alignItems="center" container>
          <Grid item xs={2} className={classes.paddingRight} onClick={this.props.close}>
            <KeyboardArrowLeft className={classes.fontSize} />
          </Grid>
          <Grid item xs={10} className={classes.paddingLeft}>
            <Typography className={classes.marginTop} variant="h4" gutterBottom>
            Select dates
            </Typography>
          </Grid>
        </Grid>

        <InfiniteCalendar
          width={350}
          height={300}
          Component={MultipleDatesCalendar}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={this.selectedDate}
          onSelect={date => {
            this.setDate(date);
          }}
          className={classes.marginBottom}
        />

        <Grid className={classes.marginLeft} justify="center" alignItems="center" container>
          <Grid item xs={7} >
            <Button onClick = {this.handleSubmit} type="button" className={classes.margin} fullWidth variant="contained" color="primary">
              <Typography variant="body1" gutterBottom>submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DatePicker);
