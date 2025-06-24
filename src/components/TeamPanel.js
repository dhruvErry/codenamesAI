import './TeamPanel.css';

function TeamPanel({redLeft, blueLeft}) {
    return (
        <div className='container-team'>
            <div className = 'score red'>
                {redLeft}
            </div>
            <div className = 'score blue'>
                {blueLeft}
            </div>
        </div>
    )
}

export default TeamPanel;