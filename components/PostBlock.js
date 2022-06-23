/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '../styles/PostBlock.module.css';

const PostBlock = ({
  id,
  title,
  slug,
  featureImg,
  content,
  author,
  postedDate,
  category,
  categorySlug,
}) => {
  const date = new Date(postedDate).toDateString();

  return (
    <div className="col-md-6 col-lg-4">
      <div className="position-relative">
        <div
          className={styles.card_img_div}
          style={{
            backgroundImage: `url(${featureImg || './uploads/No_Image.png'})`,
          }}
        ></div>
        <div
          className={`card-img-overlay d-flex align-items-start flex-column p-3 ${styles.graident}`}
        >
          <div className={`w-100 mt-auto ${styles.z5}`}>
            <a href={`/${categorySlug}`} className="badge bg-warning mb-2">
              <i className="fas fa-circle me-2 small fw-bold"></i>
              {category}
            </a>
          </div>
        </div>
      </div>
      <div className="card-body px-0 py-3">
        <h4 className="card-title">
          <Link
            href={`/${categorySlug}/${slug}`}
            className="btn-link text-reset fw-bold"
          >
            {title}
          </Link>
        </h4>
        <p className="card-text">
          {content.length > 30 ? content.substring(0, 100) + '...' : content}
        </p>
      </div>
      <ul className="nav align-items-center d-flex">
        <li className="nav-item">
          <div className="nav-link ps-0">
            <div className="d-flex align-items-center position-relative">
              <div className={styles.avatar}>
                <img
                  className="avatar-img rounded-circle"
                  src="https://blogzine.webestica.com/assets/images/avatar/03.jpg"
                  alt="avatar"
                />
              </div>
              <span className="ms-2">
                <Link href="#" className="stretched-link text-reset btn-link">
                  <>by {author}</>
                </Link>
              </span>
            </div>
          </div>
        </li>
        <li className="nav-item">{date}</li>
      </ul>
    </div>
  );
};

export default PostBlock;
