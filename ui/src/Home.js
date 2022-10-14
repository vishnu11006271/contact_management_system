export function Home(){
    return(<div className="container" style={{ backgroundColor: '#FFFFFF', borderRadius: '5px'}}>
    <div className="jumbotron text-center">
  <h1>Welcome To This Page</h1>
  <p>Resize this responsive page to see the effect!</p> 
</div>


<nav  className="navbar navbar-dark bg-dark" style={{ backgroundColor: 'coral', borderRadius: '25px'}}>
  <div className="container-fluid">
    <div className="container-fluid">
      <a className="navbar-brand" href="http://localhost:3000" style={{ color: 'white', lineHeight : 4, padding: 20 }}>WebSiteName</a>
      <a className="navbar-brand" href="http://localhost:3000" style={{ color: 'white', lineHeight : 4, padding: 20 }}>Home</a>
      <a className="navbar-brand" href="http://localhost:3000/fetch/" style={{ color: 'white', lineHeight : 4, padding: 20 }}>Show Users</a>
      <a className="navbar-brand" href="http://localhost:3000/store/" style={{ color: 'white', lineHeight : 4, padding: 20 }}>Save User</a>
      <a className="navbar-brand" href="http://localhost:3000/update/" style={{ color: 'white', lineHeight : 4, padding: 20 }}>Update User</a>
    </div>
    {/* <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
    </div> */}
  </div>
</nav>

<div className="container" style={{ backgroundColor: '#F5F5F5', borderRadius: '25px', margin: '10px 0px 0px 0px'}}>
  <div className="row">
    <div className="col-sm-4" style={{ backgroundColor: 'grey', borderRadius: '25px', margin: '10px 0px 0px 0px'}}>
      <h2>About Me</h2>
      <h5>Photo of me:</h5>
      <div className="fakeimg">Fake Image</div>
      <p></p>
      <h3>Some Links</h3>
      <p>These are independent piece of code that can be maintained independently and reused in multiple places, in a web page you can see multiple components, where the entire page is not coded instead the components are added to the page to fit the entire page.</p>
      <ul className="nav nav-pills nav-stacked">
        <li className="active"><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
      <hr className="hidden-sm hidden-md hidden-lg" />
    </div>
    <div className="col-sm-8" style={{ backgroundColor: 'rgb(173,216,230)', borderRadius: '25px', margin: '10px 0px 0px 0px'}}>
      <h2>LINUX INSTALL</h2>
      <h5>Installation</h5>
      <div className="fakeimg">Fake Image</div>
      <p>Some text..</p>
      <p>Once you install either Linux terminal based or Ubuntu you will get access to the OS, but you need to use terminal of the OS to perform any operations, 
Below is the snapshot of how Linux based machine looks.
</p>
      <br />
      <h2>ACTIVITY</h2>
      <h5>Posted on, Sep 2, 2022</h5>
      <div className="fakeimg">Fake Image</div>
      <p>Some text..</p>
      <p>2.	After you try the Math example, try to show a random number of 6 digits, if it returns 5 or lesser digits, it must not be shown on the browser, it must be regenerated automatically when the digits are not 6, the program must show 6 digits no matter how many times you run</p>
    </div>
  </div>
</div>

<div className="jumbotron text-center" style={{ lineHeight : 4, color: 'white', backgroundColor: 'black', borderRadius: '25px', margin: '10px 0px 0px 0px'}}>
  <p>Footer</p>
</div>
  </div>
    )
}