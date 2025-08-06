const image_transition = (props) => {
  const element = document.getElementById(props.element_id);
  const [imageIndex, setImageIndex] = useState(0)
  setInterval(() => transition(element, props.imageList, imageIndex, setImageIndex), 5000)
};

