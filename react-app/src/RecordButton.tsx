import './RecordButton.css';

export const RecordButton = (props: {
  isRecording: boolean;
  onClick(): void;
}) => (
  <div className={`recordButtonContainer ${props.isRecording ? 'recording' : 'stopped'}`}>
    <div className='recordButtonOuter' onClick={props.onClick}>
      <div className='recordButtonInner'>
        <div className='recordButtonStop'>
        </div>
      </div>
    </div>
  </div>
)
