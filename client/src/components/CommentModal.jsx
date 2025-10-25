import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function CommentModal({
  open,
  onClose,
  foodId,
  axiosSecure,
  queryKey,
  editingComment,
  currentUser,
  onDone,
}) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    setText(editingComment?.comment || "");
  }, [editingComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.email) {
      Swal.fire("Login required", "Please login to comment", "info");
      return;
    }

    try {
      if (editingComment) {
        await axiosSecure.put(`/comment`, {
          foodId, 
          commentId : editingComment._id,
          email: currentUser.email,
          newComment: text,
          
        });
        Swal.fire("Updated", "Comment updated successfully", "success");
      } else {
        await axiosSecure.post("/comment", {
          id: foodId,
          email: currentUser.email,
          commentText: text,
        });
        Swal.fire("Added", "Comment posted successfully", "success");
      }

      queryClient.invalidateQueries(queryKey);
      onDone?.();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not save comment", "error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {editingComment ? "Edit Comment" : "Add Comment"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none shadow-sm transition"
                placeholder="Write your comment here..."
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  {editingComment ? "Save Changes" : "Post Comment"}
                </button>
              </div>
            </form>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
