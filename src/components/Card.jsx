// A component to display either a hangout or a person profile
function Card({ type, info, isLiked, onLikeToggle }) {
  // Determine content based on the type prop
  let details;
  if (type === 'hangout') {
    details = (
      <>
        <h3>{info.name}</h3>
        <h3>{info.location}</h3>
        <h3>{info.dateTime}</h3>
        <h3>{info.organizer}</h3>
      </>
    );
  } else if (type === 'person') {
    details = (
      <>
        <h3>{info.firstName} {info.lastName}</h3>
        <h3>{info.graduationYear}</h3>
        <h3>{info.major}</h3>
        <h3>{info.bio}</h3>
      </>
    );
  }

  const likeStatus = `card ${isLiked ? 'card-liked' : ''}`;
  const buttonText = isLiked ? 'Unlike' : 'Like';
  
  return (
    <article className={likeStatus}>
      {details}
      <button onClick={() => onLikeToggle(info.id, type)}>
        {buttonText}
      </button>
    </article>
  );
}

export default Card;