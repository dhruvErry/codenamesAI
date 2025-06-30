import './TeamPanel.css';

function TeamPanel({redLeft, blueLeft}) {
    return (
        <div className="container-team">
            <div className="score redTeam">
                <div className="number">{redLeft}</div>
                <div className="team-members">
                    Member 1
                    Member 2
                </div>
            </div>
            <div className="score blueTeam">
                <div className="number">{blueLeft}</div>
                <div className="team-members">
                    Member 1
                    Member 2
                </div>
            </div>
        </div>

    )
}

export default TeamPanel;