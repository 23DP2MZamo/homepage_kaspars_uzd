<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->tasks()->with('category');

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $tasks = $query->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['priority'] = $validated['priority'] ?? 'medium';

        $task = Task::create($validated);
        $task->load('category');

        return response()->json($task, 201);
    }

    public function show(Request $request, $id)
    {
        $task = $request->user()->tasks()->with('category')->findOrFail($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'priority' => 'nullable|in:low,medium,high',
            'completed' => 'sometimes|boolean',
        ]);

        $task->update($validated);
        $task->load('category');

        return response()->json($task);
    }

    public function destroy(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Uzdevums dzēsts'], 200);
    }

    public function toggle(Request $request, $id)
    {
        $task = $request->user()->tasks()->findOrFail($id);
        $task->completed = !$task->completed;
        $task->save();
        $task->load('category');

        return response()->json($task);
    }
}
