function NewlineText(props) {
    const text = props.text;
    const newText = text.split('{}').map((str, index) => <p key={index}>{str}</p>);
    
    return newText;
}

export default NewlineText;