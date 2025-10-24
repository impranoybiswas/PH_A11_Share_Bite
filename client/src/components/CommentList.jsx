import React from "react";
import { format } from "date-fns";

export default function CommentList({ comments = [], onEdit, onDelete, currentUserEmail }) {
  if (!comments.length) {
    return (
      <div className="text-sm text-gray-500 italic py-4 text-center">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold border-b pb-2">
        Comments ({comments.length})
      </h4>

      {comments.map((c) => (
        <div
          key={String(c._id)}
          className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
        >
          <div className="flex justify-between items-start">
            {/* Author Info & Timestamp */}
            <div>
              <div className="text-sm font-semibold text-gray-800">{c.author}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {c.date ? format(new Date(c.date), "PPpp") : ""}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {currentUserEmail === c.author && (
                <>
                  <button
                    onClick={() => onEdit(c)}
                    className="text-xs md:text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(String(c._id), c.author)}
                    className="text-xs md:text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Comment Text */}
          <div className="mt-2 text-gray-700 leading-relaxed">{c.comment}</div>
        </div>
      ))}
    </div>
  );
}
