
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>INSPINIA - Landing Page</title>

    <!-- Bootstrap core CSS -->
    <link href="{{ config('voyager.path') }}/css/bootstrap.min.css" rel="stylesheet">

    <!-- Animation CSS -->
    <link href="{{ config('voyager.path') }}/css/animate.css" rel="stylesheet">
    <link href="{{ config('voyager.path') }}/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="{{ config('voyager.path') }}/css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="{{ config('voyager.path') }}/css/flipclock.css">
    <style>
    img#logo {

    /* Rotate div */
    -ms-transform: rotate(-30deg); /* IE 9 */
    -webkit-transform: rotate(-30deg); /* Chrome, Safari, Opera */
    transform: rotate(-30deg);
        }
    </style>
</head>
<body id="page-top" class="landing-page no-skin-config">
<div class="navbar-wrapper">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header page-scroll">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html">  <img src="{{ config('voyager.path') }}/img/logo (1).png" alt="dashboard" style="width: 115px;" class="img-responsive"></a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a class="page-scroll" href="#page-top">Home</a></li>
                        <li><a class="page-scroll" href="#features">Benefits</a></li>
                        <li><a class="page-scroll" href="#team">About us</a></li>
                        <li><a class="page-scroll" href="#testimonials">Testimonials</a></li>
                        <li><a class="page-scroll" href="#pricing">Membership</a></li>
                        <li><a class="page-scroll" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
</div>
<div id="inSlider" class="carousel carousel-fade" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#inSlider" data-slide-to="0" class="active"></li>
        <li data-target="#inSlider" data-slide-to="1"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <div class="container">
                <div class="carousel-caption">
                    <h1>We craft<br/>
                        brands, web apps,<br/>
                        and user interfaces<br/>
                        we are IN+ studio</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    <p>
                        <a class="btn btn-lg btn-primary" href="#" role="button">READ MORE</a>
                        <a class="caption-link" href="#" role="button">Inspinia Theme</a>
                    </p>
                </div>
                <div class="carousel-image wow zoomIn">
                    <img src="{{ config('voyager.path') }}/img/landing/laptop.png" alt="laptop"/>
                </div>
            </div>
            <!-- Set background for slide in css -->
            <div class="header-back one"></div>

        </div>
        <div class="item">
            <div class="container">
                <div class="carousel-caption blank">
                    <h1>We create meaningful <br/> interfaces that inspire.</h1>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                    <p><a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
                </div>
            </div>
            <!-- Set background for slide in css -->
            <div class="header-back two"></div>
        </div>
    </div>
    <a class="left carousel-control" href="#inSlider" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#inSlider" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>


<section id="features" class="container services">
    <div class="row">
        <div class="col-sm-3">
            <h2>Full responsive</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
            <p><a class="navy-link" href="#" role="button">Details &raquo;</a></p>
        </div>
        <div class="col-sm-3">
            <h2>LESS/SASS Files</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
            <p><a class="navy-link" href="#" role="button">Details &raquo;</a></p>
        </div>
        <div class="col-sm-3">
            <h2>6 Charts Library</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
            <p><a class="navy-link" href="#" role="button">Details &raquo;</a></p>
        </div>
        <div class="col-sm-3">
            <h2>Advanced Forms</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus.</p>
            <p><a class="navy-link" href="#" role="button">Details &raquo;</a></p>
        </div>
    </div>
</section>

<section  class="container features">
  <div class="row">
      <div class="col-lg-12 text-center">
          <div class="navy-line"></div>
          <h1>A Few Words About Us  </h1>
      </div>
  </div>
  <div class="row features-block">
      <div class="col-lg-6 features-text wow fadeInLeft">
          <small>Arab-Patents</small>
          <h2>A Few Words About Us  </h2>
          <p>
            We are a group aimed at developing an economic system in which qualitative, qualitative and creative science represents the main production element and the driving force behind the production of the revolution to create an effective "creative relationship" to attract investors and build innovative projects to renew development strategies and provide better access to sustainable development through the knowledge economy One of the fastest growing sectors in the world economy, the most productive in terms of productivity and material return, the creation of jobs and the opening of export horizons, relying on two main elements:
            Building and successful distribution of human potential
            To achieve international partnerships and share experiences.
          </p>
          <a href="http://www.arabpatents.com/" class="btn btn-primary">Learn more</a>
      </div>
      <div class="col-lg-6 text-right wow fadeInRight">
          <img src="{{ config('voyager.path') }}/img/landing/00001.png" alt="dashboard" class="img-responsive pull-right">
      </div>
  </div>


</section>

<section id="team" class="gray-section team">
    <div class="container">
        <div class="row m-b-lg">
            <div class="col-lg-12 text-center">
                <div class="navy-line"></div>
                <h1>Our Team</h1>
                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 wow fadeInLeft">
                <div class="team-member">
                    <img src="img/landing/avatar3.jpg" class="img-responsive img-circle img-small" alt="">
                    <h4><span class="navy">Amelia</span> Smith</h4>
                    <p>Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus. </p>
                    <ul class="list-inline social-icon">
                        <li><a href="#"><i class="fa fa-twitter"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-facebook"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="team-member wow zoomIn">
                    <img src="{{ config('voyager.path') }}/img/landing/avatar1.jpg" class="img-responsive img-circle" alt="">
                    <h4><span class="navy">John</span> Novak</h4>
                    <p>Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus.</p>
                    <ul class="list-inline social-icon">
                        <li><a href="#"><i class="fa fa-twitter"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-facebook"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-4 wow fadeInRight">
                <div class="team-member">
                    <img src="{{ config('voyager.path') }}/img/landing/avatar2.jpg" class="img-responsive img-circle img-small" alt="">
                    <h4><span class="navy">Peter</span> Johnson</h4>
                    <p>Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus.</p>
                    <ul class="list-inline social-icon">
                        <li><a href="#"><i class="fa fa-twitter"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-facebook"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
            </div>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="navy-line"></div>
                <h1>Even more great feautres</h1>
                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. </p>
            </div>
        </div>
        <div class="row features-block">
            <div class="col-lg-3 features-text wow fadeInLeft">
                <small>INSPINIA</small>
                <h2>Perfectly designed </h2>
                <p>INSPINIA Admin Theme is a premium admin dashboard template with flat design concept. It is fully responsive admin dashboard template built with Bootstrap 3+ Framework, HTML5 and CSS3, Media query. It has a huge collection of reusable UI components and integrated with latest jQuery plugins.</p>
                <a href="" class="btn btn-primary">Learn more</a>
            </div>
            <div class="col-lg-6 text-right m-t-n-lg wow zoomIn">
                <img src="{{ config('voyager.path') }}/img/landing/footer-logo.png" class="img-responsive" alt="dashboard">
            </div>
            <div class="col-lg-3 features-text text-right wow fadeInRight">
                <small>INSPINIA</small>
                <h2>Perfectly designed </h2>
                <p>INSPINIA Admin Theme is a premium admin dashboard template with flat design concept. It is fully responsive admin dashboard template built with Bootstrap 3+ Framework, HTML5 and CSS3, Media query. It has a huge collection of reusable UI components and integrated with latest jQuery plugins.</p>
                <a href="" class="btn btn-primary">Learn more</a>
            </div>
        </div>
    </div>

</section>

<section class="timeline gray-section">
    <div class="container">
      <div class="row">
          <div class="col-lg-12 text-center">
              <div class="navy-line"></div>
              <h1>The project Benefits  </h1>
              <span class="navy">This project with a huge amount of privileges is held on the <br/> sponsor state without any direct expenses remember.</span>
                <div class="row">

              <div class="col-md-4 col-lg-offset-4  text-center wow fadeIn" style="margin-top: 15px;">
                <i class="fa fa-dollar features-icon"></i>
                <h2>Revenue</h2>
                <p>The sources of revenue for this project are more than 60 sources and most of them are innovative and unique sources that have never existed before in completed and comprehensive models.</p>
            </div>
            </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-3 text-center wow fadeInLeft">
              <div>
                  <i class="fa fa-handshake-o features-icon"></i>
                  <h2>Approval</h2>
                  <p>This project has received preliminary approval from some European cities to participate and many international factories and innovators around the world.</p>
              </div>
              <div class="m-t-lg">
                  <i class="fa fa-bar-chart features-icon"></i>
                  <h2>Investment</h2>
                  <p>Investment of the product of the minds of the development of the economy, and the industry of an advanced industrial state, when the project is established on the land of this country.</p>
              </div>
          </div>
          <div class="col-md-6 text-center  wow zoomIn">
              <img src="{{ config('voyager.path') }}/img/landing/footer-logo.png" id="logo" style="margin-top: 100px;margin-left: 100px;" alt="dashboard" class="img-responsive">
          </div>
          <div class="col-md-3 text-center wow fadeInRight">
              <div>
                  <i class="fa fa-plane features-icon"></i>
                  <h2>Tourism</h2>
                  <p>An innovative way to shop and tourism in one place at competitive prices.</p>
              </div>
              <div class="m-t-lg">
                  <i class="fa fa-globe features-icon"></i>
                  <h2>Integrated Commercial</h2>
                  <p>An integrated commercial, industrial, scientific and tourism city that links world markets and attracts investors in innovative and unique ways.</p>
              </div>
          </div>
      </div>
    </div>

</section>

<section id="testimonials" class="navy-section testimonials" style="margin-top: 0">

    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center wow zoomIn">
                <i class="fa  fa-clock-o big-icon"></i>
                <h3>
                    Wating
                </h3>
                <div class="testimonials-text">
                    <div class="clock" style="margin:2em;margin: 3% 25%;width: 55%;"></div>
                </div>
                <small>
                    <strong>01.01.2017 - End Date</strong>
                </small>
            </div>
        </div>
    </div>

</section>

<section class="comments gray-section" style="margin-top: 0">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="navy-line"></div>
                <h1>What our partners say</h1>
                <p>Donec sed odio dui. Etiam porta sem malesuada. </p>
            </div>
        </div>
        <div class="row features-block">
            <div class="col-lg-4">
                <div class="bubble">
                    "Uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                </div>
                <div class="comments-avatar">
                    <a href="" class="pull-left">
                        <img alt="image" src="{{ config('voyager.path') }}/img/landing/avatar3.jpg">
                    </a>
                    <div class="media-body">
                        <div class="commens-name">
                            Andrew Williams
                        </div>
                        <small class="text-muted">Company X from California</small>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="bubble">
                    "Uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                </div>
                <div class="comments-avatar">
                    <a href="" class="pull-left">
                        <img alt="image" src="{{ config('voyager.path') }}/img/landing/avatar1.jpg">
                    </a>
                    <div class="media-body">
                        <div class="commens-name">
                            Andrew Williams
                        </div>
                        <small class="text-muted">Company X from California</small>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="bubble">
                    "Uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                </div>
                <div class="comments-avatar">
                    <a href="" class="pull-left">
                        <img alt="image" src="{{ config('voyager.path') }}/img/landing/avatar2.jpg">
                    </a>
                    <div class="media-body">
                        <div class="commens-name">
                            Andrew Williams
                        </div>
                        <small class="text-muted">Company X from California</small>
                    </div>
                </div>
            </div>



        </div>
    </div>

</section>

<section class="features">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="navy-line"></div>
                <h1>More and more extra great feautres</h1>
                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. </p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-5 col-lg-offset-1 features-text">
                <small>INSPINIA</small>
                <h2>Perfectly designed </h2>
                <i class="fa fa-bar-chart big-icon pull-right"></i>
                <p>INSPINIA Admin Theme is a premium admin dashboard template with flat design concept. It is fully responsive admin dashboard template built with Bootstrap 3+ Framework, HTML5 and CSS3, Media query. It has a huge collection of reusable UI components and integrated with.</p>
            </div>
            <div class="col-lg-5 features-text">
                <small>INSPINIA</small>
                <h2>Perfectly designed </h2>
                <i class="fa fa-bolt big-icon pull-right"></i>
                <p>INSPINIA Admin Theme is a premium admin dashboard template with flat design concept. It is fully responsive admin dashboard template built with Bootstrap 3+ Framework, HTML5 and CSS3, Media query. It has a huge collection of reusable UI components and integrated with.</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-5 col-lg-offset-1 features-text">
                <small>INSPINIA</small>
                <h2>Perfectly designed </h2>
                <i class="fa fa-clock-o big-icon pull-right"></i>
                <p>INSPINIA Admin Theme is a premium admin dashboard template with flat design concept. It is fully responsive admin dashboard template built with Bootstrap 3+ Framework, HTML5 and CSS3, Media query. It has a huge collection of reusable UI components and integrated with.</p>
            </div>
            <div class="col-lg-5 features-text">
                <small>INSPINIA</small>
                <h2>Perfectly designed </h2>
                <i class="fa fa-users big-icon pull-right"></i>
                <p>INSPINIA Admin Theme is a premium admin dashboard template with flat design concept. It is fully responsive admin dashboard template built with Bootstrap 3+ Framework, HTML5 and CSS3, Media query. It has a huge collection of reusable UI components and integrated with.</p>
            </div>
        </div>
    </div>

</section>
<section id="pricing" class="pricing">
    <div class="container">
        <div class="row m-b-lg">
            <div class="col-lg-12 text-center">
                <div class="navy-line"></div>
                <h1>Membership</h1>
                <p style="text-align: justify;">The world is now turning to new economies that achieve sustainable development, generate jobs and rapid economic growth .... It is a creative economy based on science and knowledge.
In light of the technological development and the great revolution, the world has turned to the knowledge-based knowledge economy and the ideas produced by young people, entrepreneurs, innovators and innovators in the world. These ideas have been underestimated by some, but now they are on the list of the world's wealthiest. Innovative ideas.
The world has adopted a creative economy that applies these pioneering creative ideas and turns them into products with little capital, because it generates high profits, sustainability, rapid growth and job creation.
For this reason, we have launched the idea of ​​an innovative industrial city to put our silence in the world of the new economy and open the door for investors, companies and factories to join us in this innovative project, which is a qualitative transfer to the country on its territory.
</p>


            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 wow zoomIn">
                <ul class="pricing-plan list-unstyled">
                    <li class="pricing-title">
                      Customers
                    </li>
                    <li class="pricing-desc">
                        They are individuals and small companies that buy private or commercial products in small quantities.
                    </li>

                    <li>
                        <a class="btn btn-primary btn-xs" href="#">Signup</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-4 wow zoomIn">
                <ul class="pricing-plan list-unstyled selected">
                    <li class="pricing-title">
                        Companies and Factories
                    </li>
                    <li class="pricing-desc">
                      Is offering its products to the knowledge economy project to market and sell through the innovative electronic platform, the world's first city of its kind in the world.
                    </li>


                    <li class="plan-action">
                        <a class="btn btn-primary btn-xs" href="#">Signup</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-4 wow zoomIn">
                <ul class="pricing-plan list-unstyled">
                    <li class="pricing-title">
                      Investors
                    </li>
                    <li class="pricing-desc" style="height: 94px;">
                      They are traders who import from different industrial countries
                    </li>

                    <li>
                        <a class="btn btn-primary btn-xs" href="#">Signup</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row m-t-lg">
            <div class="col-lg-8 col-lg-offset-2 text-center m-t-lg">
              <P class="font-italic">
              <span class=" text-danger"> Notice:</span> This stage is only for members to register and take their views on the nomination of the project area. The official launch will be followed by official procedures through a press conference in the presence of a group of economists, politics and knowledge around the world to be announced later.
              </p>
            </div>
        </div>
    </div>

</section>

<section id="contact" class="gray-section contact">
    <div class="container">
        <div class="row m-b-lg" style="margin-bottom:0;">
            <div class="col-lg-12 text-center">
                <div class="navy-line"></div>
                <h1>Contact Us</h1>
                <p>To communicate with us.</p>
            </div>
        </div>
        <div class="row m-b-lg">

                            <div class="col-sm-5 col-lg-offset-2 b-r" style="padding-right: 7px;">
                                <form role="form">
                                    <div class="form-group"><label class="col-sm-2 control-label">Email</label><div class="col-sm-10" style="margin-bottom: 10px;"> <input type="email" placeholder="Enter email" class="form-control"></div></div>
                                    <div class="form-group"><label class="col-sm-2 control-label">Subject</label><div class="col-sm-10" style="margin-bottom: 10px;"> <input type="text" placeholder="Subject" class="form-control"></div></div>
                                    <div class="form-group"><label class="col-sm-2 control-label">Message</label><div class="col-sm-10" style="margin-bottom: 10px;"> <textarea rows="5" placeholder="Message Text..." class="form-control"></textarea></div></div>
                                </form>
                            </div>
                            <div class="col-sm-4">
                              <address>
                                  <strong><span class="navy">Company name, Inc.</span></strong><br/>
                                  795 Folsom Ave, Suite 600<br/>
                                  San Francisco, CA 94107<br/>
                                  <abbr title="Phone">P:</abbr> (123) 456-7890
                              </address>
                            </div>

        </div>
        <div class="row">
            <div class="col-lg-12 text-center">
                <a href="mailto:test@email.com" class="btn btn-primary">Send us mail</a>
                <p class="m-t-sm">
                    Or follow us on social platform
                </p>
                <ul class="list-inline social-icon">
                    <li><a href="#"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li><a href="#"><i class="fa fa-linkedin"></i></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                <p><strong>&copy; 2017 www.arabpatents.com  </strong><br/> This project definition page and the project and the official site of the project at the press conference, after completing the registration of the required number on this page, this project is one of the projects.</p>
            </div>
        </div>
    </div>
</section>
<div id="getting-started"></div>

<!-- Mainly scripts -->
<script src="{{ config('voyager.path') }}/js/jquery-3.1.1.min.js"></script>
<script src="{{ config('voyager.path') }}/js/bootstrap.min.js"></script>
<script src="{{ config('voyager.path') }}/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="{{ config('voyager.path') }}/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="{{ config('voyager.path') }}/js/inspinia.js"></script>
<script src="{{ config('voyager.path') }}/js/plugins/pace/pace.min.js"></script>
<script src="{{ config('voyager.path') }}/js/plugins/wow/wow.min.js"></script>
<script src="{{ config('voyager.path') }}/js/flipclock.js"></script>

<script>
var clock;

    $(document).ready(function () {

        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 80
        });

        // Page scrolling feature
        $('a.page-scroll').bind('click', function(event) {
            var link = $(this);
            $('html, body').stop().animate({
                scrollTop: $(link.attr('href')).offset().top - 50
            }, 500);
            event.preventDefault();
            $("#navbar").collapse('hide');
        });


            // Grab the current date
            var currentDate = new Date();

            // Set some date in the future. In this case, it's always Jan 1
            var futureDate  = new Date(currentDate.getFullYear() + 1, 0, 1);

            // Calculate the difference in seconds between the future and current date
            var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

            // Instantiate a coutdown FlipClock
            clock = $('.clock').FlipClock(diff, {
              clockFace: 'DailyCounter',
              countdown: true
            });
    });

    var cbpAnimatedHeader = (function() {
        var docElem = document.documentElement,
                header = document.querySelector( '.navbar-default' ),
                didScroll = false,
                changeHeaderOn = 200;
        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }
        function scrollPage() {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                $(header).addClass('navbar-scroll')
            }
            else {
                $(header).removeClass('navbar-scroll')
            }
            didScroll = false;
        }
        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }
        init();

    })();

    // Activate WOW.js plugin for animation on scrol
    new WOW().init();

</script>

</body>
</html>
