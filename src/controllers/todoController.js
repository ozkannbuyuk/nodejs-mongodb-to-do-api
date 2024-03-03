const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
  try {
    const _todo = await todo.findOne({ name: req.body.name });
    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "A record with this name already exists",
      });
    }

    const todoToAdd = new todo(req.body);

    await todoToAdd
      .save()
      .then(() => {
        return res.status(201).json(todoToAdd);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "Error occurred while creating the record: " + err,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create the record!",
    });
  }
};

const todoGetAll = async (req, res) => {
  const { page } = req.query;
  const limit = 2;
  const skip = Number(page - 1) * limit;
  try {
    const todos = await todo.find({}).limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve records!",
    });
  }
};

const todoUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await todo.findByIdAndUpdate(id, req.body);
    if (updatedTodo) {
      return res.status(200).json({
        success: true,
        message: "Update successful",
      });
    } else
      return res.status(400).json({
        success: false,
        message: "Failed to update the record!",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update the record!",
    });
  }
};

const todoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await todo.findByIdAndDelete(id);
    if (deletedTodo) {
      return res.status(200).json({
        success: true,
        message: "Record deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to delete the record",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the record: " + error,
    });
  }
};

const todoGet = async (req, res) => {
  const { id } = req.params;

  const todoRecord = await todo.findById(id);
  if (todoRecord) {
    return res.status(200).json(todoRecord);
  } else {
    return res.status(404).json({
      success: false,
      message: "Record not found!",
    });
  }
};

module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGet,
};
