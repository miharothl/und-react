import {Component} from "react";
import {connect} from "react-redux";
import PollResult from "./PollResult";
import PollQuestion from "./PollQuestion";

class PollItem extends Component {

    state = {
        selectedOption: null,
    }

    render() {
        const {id, user} = this.props;
        const answered = Object.keys(user.answers).includes(id);

        return (
            <div>
                {answered && (
                    <PollResult id={id} />
                )
                }
                {!answered && (
                    <PollQuestion id={id} />
                )
                }
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const {id} = props.match.params;
    const question = questions[id]
    const user = users[authedUser];
    const author = question ? users[question['author']] : null;

    return {
        id,
        question,
        user,
        author,
    };
}

export default connect(mapStateToProps)(PollItem);