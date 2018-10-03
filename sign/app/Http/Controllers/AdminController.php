<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Student;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function viewDetails(){
        $data = Student::paginate(25);       //get user data from masters table
        return response()->json($data, 200);
    }
}
