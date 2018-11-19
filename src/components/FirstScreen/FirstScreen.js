import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';
import SectionChoice from '../SectionChoice';
import Button from '../Button';
import { getIdxs } from '../../actions';
import './FirstScreen.css';

class FirstScreen extends Component {
  static propTypes = {
    nextStep: PropTypes.func.isRequired,
    titles: PropTypes.objectOf(PropTypes.string).isRequired,
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    titleIndex: 0,
    sectionIndex: 0,
  };

  toNextScreen = () => {
    const { titleIndex, sectionIndex } = this.state;
    const { nextStep, getIdxs } = this.props;

    getIdxs({ titleIndex, sectionIndex });
    nextStep();
  };

  choiceTitle = (titleIndex) => {
    this.setState({ titleIndex });
  };

  choiceSection = (sectionIndex) => {
    this.setState({ sectionIndex });
  };

  render() {
    const { titles, sections } = this.props;

    return (
      <div className="jumbotron description">
        <p className="lead bold">
          Camouflage Review is a new way to review your practice sections for maximum score
          improvement. It must be completed BEFORE you check your answers against the answer key.
        </p>
        <p className="lead">
          After completing a section (and before looking at the answer key), input your answers into
          the Camouflage Review system and it will return a list of questions for you to revisit.{' '}
          <span className="bold">
            Some of these Camouflage Review questions are wrong answers, but some of them are
            camouflaged correct answers lurking to test your confidence.
          </span>{' '}
          On your second pass through these questions you won't know how many you missed, so you'll
          be challenged to change your answer or stay with your previous answer based only on your
          confidence in the answer you chose.
        </p>

        <p className="lead">
          Based on how you perform on your second pass through the camouflaged questions, the system
          will present your unique wrong answer profile. There are three main reasons students miss
          questions: conceptual gaps, misreads, and self-doubt. Here’s how Camouflage Review helps
          you analyze what’s causing your wrong answers:
        </p>

        <ul>
          <li>
            <p className="lead">
              Wrong answers you miss again in Camouflage Review indicate conceptual gaps.
            </p>
          </li>
          <li>
            <p className="lead">
              Wrong answers you correct in Camouflage Review indicate a misread.
            </p>
          </li>
          <li>
            <p className="lead">
              Correct answers that you switch away from in Camouflage Review indicate self-doubt.
            </p>
          </li>
        </ul>

        <p className="lead bold">
          Seeing these differences between your wrong answers is crucial to improving as much as
          possible from each practice section.
        </p>

        <p className="lead">
          There's no point in obsessing over a question you simply misread and quickly corrected;
          those misses result from translation issues. But{' '}
          <span className="bold">the questions you miss twice are gold mines.</span> They represent
          the gaps in your understanding of the test; dive into these twice-missed questions and
          find out what conceptual gap is tripping you up. You can ensure that you never make that
          same mistake again.
        </p>

        <p className="lead">Ready to start Camo Review? Choose your test and section to begin:</p>

        <hr className="my-4" />
        <Dropdown titles={titles} choiceTitle={this.choiceTitle} />
        <SectionChoice sections={sections} choiceSection={this.choiceSection} />
        <Button label="Review Section Now" callback={this.toNextScreen} />
      </div>
    );
  }
}

export default connect(
  null,
  { getIdxs }
)(FirstScreen);
