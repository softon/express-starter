var Todo = require('../models/todo');
const { validationResult } = require('express-validator');

// Display list of all Todos.
exports.index = function(req, res) {
    Todo.find(function (err, todos) {
       if (err) return handleError(err);
         // saved!
        
       res.render('todos.index',{todos: todos, title: 'All Todos'});

       });

};

// Add new Todo View.
exports.add = function(req, res) {    
  res.render('todos.add',{title: 'Add new Todo' });
};

// Add new Todo.
exports.create = function(req, res) {        
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error_messages', errors.array());
    return res.redirect('back');
  }
  Todo.create({
    title: req.body.title
  },function(err){
    if(err){
      //res.redirect('back');
    }else{
      req.flash('success_message', 'New todo added successfully.');
      res.redirect('/');
    }
  });
};

// Edit Todo.
exports.edit = function(req, res) {        
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error_messages', errors.array());
    return res.redirect('back');
  }
  Todo.updateOne({ _id: req.params.id },{
    title: req.body.title
  },function(err){
    if(err){
      //res.redirect('back');
    }else{
      req.flash('success_message', 'Todo Updated successfully.');
      res.redirect('/');
    }
  });
};

// All Todo Actions.
exports.actions = function(req, res) {    
  switch(req.body.action){
    case 'complete':
      Todo.findById(req.body._id,(err, todo) => {
        if(err) console.log('Invalid ID.');

        todo.status = true;
        todo.save();
        req.flash('success_message', 'Todo marked complete.');
        
      });
      break;
    case 'pending':
      Todo.findById(req.body._id,(err, todo) => {
        if(err) console.log('Invalid ID.');

        todo.status = false;
        todo.save();
        req.flash('success_message', 'Todo marked pending.');
      });
      break;
    case 'delete':
      Todo.findById(req.body._id,(err, todo) => {
        if(err) console.log('Invalid ID.');

        todo.delete();
        req.flash('success_message', 'Todo deleted.');
      });
      break;
    case 'edit':
      return Todo.findById(req.body._id,(err, todo) => {
        if(err) console.log('Invalid ID.');

        return res.render('todos.edit',{title: 'Edit Todo', todo });
      });
      break;
  }

  return res.redirect('/');
};