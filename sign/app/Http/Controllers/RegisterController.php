<?php

namespace App\Http\Controllers;

use App\Mail\SendMailable;
use App\Mail\ForgotPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    public function registerStudent(Request $request){		//registering student details.

      Mail::to($request->email)->send(new SendMailable($request));

    	$this->validate($request,[
    		'name' => 'required',
    		'userID' => 'required',
        'email' => 'required|email|max:100',
        'password'=> array('required', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/', 'min:8')]
      	);

      	$id = null;
      	$id = DB::select('select id from users 
      			where userID = :userID OR email = :email',
      				['userID' => $request->userID, 
      		 		'email'=> $request->email]
      		);		//this is to check exsistence of user

      	if($id == null){
	    	DB::insert('insert into users(name, userID, email, password, role)
	    		values (:name , :userID, :email, :password, 2)',
	    		['name' => $request->name,
	    		 'userID' => $request->userID,
	    		 'email' => $request->email,
	    		 'password' => Hash::make($request->password)
	    		]
	    	);

	    	DB::insert('insert into students (name, userID, email, lastLogged)
	    		values (:name , :userID, :email, now())',
	    		['name' => $request->name,
	    		 'userID' => $request->userID,
	    		 'email' => $request->email,
	    		]
	    	);
       
	    	return response()->json("created", 201);
    	}
      else{
    		return response()->json("Already Exists", 409);
    	}
    }

    public function forgotPassword(Request $request){
      Mail::to($request->email)->send(new ForgotPassword($request));
    }

    public function setNewPassword(Request $request){
      DB::update('update users set password = :password where email = :email',
        ['password' => Hash::make($request->password),
         'email' => $request->email
        ]);
    }
}
