<?php

namespace App\Http\GraphQL\Mutations;

use App\User;
use Illuminate\Support\Facades\Hash;

class UserMutator
{
    public function login($root, array $args, $context)
    {
        $user = User::where('email', $args['email'])->first();
        if ($user && Hash::check($args['password'], $user->password)) {
            $user['token'] = $user->createToken('Todo App')->accessToken;
            return $user;
        }
        throw new \Exception('Error login');
        return null;
    }
}
