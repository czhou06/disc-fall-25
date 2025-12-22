
function Card({ type, info, isLiked, onLikeToggle }) {
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
        <h3>{info.first_name} {info.last_name}</h3>
        <h3>Class of {info.graduation_year}</h3>
        <h3>{info.major}</h3>
        <h3>{info.email}</h3>
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