import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TedTaggerDispatch } from '../models';

export interface EditableTextLabelProps {
  text: string;
}

const EditableTextLabel = (props: EditableTextLabelProps) => {

  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(props.text);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    // You can handle saving the edited value here, e.g., call an API or update state
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="props.text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{props.text}</span>
      )}
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
  };
}

const mapDispatchToProps = (dispatch: TedTaggerDispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditableTextLabel);

