<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    public function showLogin()
    {
        // show the form
          return view('login');
        // return View::make('login');
    }

    public function doLogin(Request $request)
    {
      $email = $request->request->get('email');
      if(isset($request['email'])){
           $email = strtolower($email);
      }
      // $admin = DB::table('users')->where('email',$email) ->first();
       $hashed = Hash::make('password');
       dd($hashed);
      if (Hash::check($request['password'], $admin->password)) {
          // The passwords match...
          \Session::put('admin_id', 1);
          dd($request->all());
      }


    }
}
