import '../assets/css/styles.css';
import { Routes, Route, Link } from "@solidjs/router"
import CategoryServices from "../services/categoriesService.jsx";


function CategoryBar() {
  return (
    <div class="categoryListNavbar" id="categoryListNavbar">
      <Link href={"/" + CategoryServices.categoryFilter(1)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(1)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(1)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(2)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(2)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(2)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(3)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(3)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(3)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(4)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(4)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(4)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(5)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(5)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(5)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(6)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(6)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(6)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(7)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(7)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(7)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(8)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(8)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(8)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(9)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(9)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(9)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(10)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(10)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(10)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(11)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(11)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(11)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(12)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(12)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(12)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(13)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(13)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(13)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(14)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(14)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(14)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(15)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(15)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(15)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(16)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(16)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(16)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(17)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(17)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(17)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(18)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(18)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(18)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(19)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(19)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(19)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(20)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(20)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(20)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(21)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(21)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(21)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(22)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(22)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(22)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(23)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(23)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(23)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(24)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(24)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(24)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(25)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(25)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(25)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(26)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(26)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(26)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(27)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(27)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(27)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(28)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(28)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(28)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(29)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(29)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(29)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(30)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(30)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(30)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(31)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(31)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(31)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(32)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(32)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(32)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(33)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(33)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(33)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(34)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(34)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(34)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(35)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(35)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(35)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(36)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(36)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(36)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(37)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(37)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(37)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(38)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(38)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(38)[1]}</div>
      </Link>


      <Link href={"/" + CategoryServices.categoryFilter(39)[0]} class="categoryIndividual">
        <div class="categoryAvatar">
          <img src={"../public/" +  CategoryServices.categoryFilter(39)[0] + 'devoxLogoLowRes.jpg'} alt=""></img>
        </div>
        <div class="categoryTitleNav">{CategoryServices.categoryFilter(39)[1]}</div>
      </Link>



    </div>
  );
}

export default CategoryBar;
