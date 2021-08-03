import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div>© Copyright {new Date().getFullYear()}</div>
      <div>
        Made with React<i class="fab fa-react"></i>by Emmanuel S.
      </div>

      <div className="github-repo">
        <a
          href="https://github.com/emmanuel-sarpedon/vinted-frontend"
          target="_blank"
          rel="noreferrer"
        >
          github.com/emmanuel-sarpedon/vinted-frontend
        </a>

        <a
          href="https://github.com/emmanuel-sarpedon/vinted-backend"
          target="_blank"
          rel="noreferrer"
        >
          github.com/emmanuel-sarpedon/vinted-backend
        </a>
      </div>

      <div className="external-link">
        <a href='mailto: "emmanuel.sarpedon@gmail.com"'>
          <i class="far fa-envelope fa-lg"></i>emmanuel.sarpedon@gmail.com
        </a>
      </div>
      <div className="external-link">
        <i class="fab fa-github fa-lg"></i>
        <a
          href="https://github.com/emmanuel-sarpedon?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          github.com/emmanuel-sarpedon
        </a>
      </div>
      <div className="external-link">
        <i class="fab fa-linkedin fa-lg"></i>
        <a
          href="https://www.linkedin.com/in/emmanuel-sarpedon/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/emmanuel-sarpedon/
        </a>
      </div>
    </footer>
  );
};

export default Footer;
