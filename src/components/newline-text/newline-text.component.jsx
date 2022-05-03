function NewlineText(props) {
    const text = props.text;
    const newText = text.split('{}').map(str => <p>{str}</p>);
    
    return newText;
}

export default NewlineText;