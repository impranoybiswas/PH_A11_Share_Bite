import React, { useState } from "react";
import { useParams } from "react-router";
import useAuthor from "../hooks/useAuthor";
import Container from "../customs/Container";
import { MdLocationPin } from "react-icons/md";
import { format } from "date-fns";
import { IoIosPeople } from "react-icons/io";
import { RxLapTimer } from "react-icons/rx";
import { FaPhone } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";
import RequestFood from "../components/RequestFood";
import { imageError } from "../utilities/myplaceholder";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import CommentList from "../components/CommentList";
import CommentModal from "../components/CommentModal";
import Swal from "sweetalert2";
import SocialShare from "../components/SocialShare";
import { FcLike } from "react-icons/fc";

export default function FoodDetails() {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const { data: food = {}, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => (await axiosSecure.get(`/foods/${id}`)).data,
    enabled: !!id,
  });

  const { author, name, image_url, pickup_location, expired_date, quantity, desc, contact, likedBy = [], comments = [] } = food;
  const { authorData, authorLoading } = useAuthor(author);

  if (isLoading) return <Loading />;

  // Like toggle
  const handleToggleLike = async () => {
    if (!user?.email) return Swal.fire("Login required", "Please login to like items.", "info");

    try {
      await axiosSecure.put(`/foods/${id}/like`, { email: user.email });
      queryClient.invalidateQueries(["food", id]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update like", "error");
    }
  };

  // Comments handlers
  const openAddComment = () => {
    setEditingComment(null);
    setCommentModalOpen(true);
  };

  const openEditComment = (comment) => {
    setEditingComment(comment);
    setCommentModalOpen(true);
  };

  const handleDeleteComment = async (commentId, authorEmail) => {
    if (!user?.email) return Swal.fire("Login required", "Please login to delete your comment.", "info");
    if (authorEmail !== user.email) return Swal.fire("Not allowed", "You can delete only your own comments.", "warning");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your comment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/foods/comments/${id}/${commentId}`, { data: { email: user.email } });
        queryClient.invalidateQueries(["food", id]);
        Swal.fire("Deleted", "Comment removed", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not delete comment", "error");
      }
    }
  };

  return (
    <Container>
      <section className="w-full min-h-120 shadow-sm rounded-lg p-4 border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
        {/* Image */}
        <div className="h-full md:h-100 lg:h-120 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={imageError}
          />
        </div>

        {/* Details */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
          {/* Name */}
          <h1 className="text-3xl font-bold border-l-4 border-blue-600 pl-3">{name}</h1>

          {/* Author */}
          {!authorLoading && authorData && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 shadow-sm w-fit">
              <img
                src={authorData.photo_url}
                alt={authorData.first_name}
                className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{`${authorData.first_name} ${authorData.last_name}`}</span>
                <span className="text-sm text-gray-500">{authorData.email}</span>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div className="flex items-center gap-2 text-gray-700">
              <MdLocationPin className="text-xl text-blue-600" />
              <div>
                <div className="text-xs text-gray-400">Location</div>
                <div className="font-medium">{pickup_location}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <RxLapTimer className="text-xl text-red-500" />
              <div>
                <div className="text-xs text-gray-400">Expires On</div>
                <div className="font-medium">{expired_date ? format(new Date(expired_date), "PPP") : "—"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <IoIosPeople className="text-xl text-green-500" />
              <div>
                <div className="text-xs text-gray-400">Quantity</div>
                <div className="font-medium">{quantity}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-xl text-yellow-500" />
              <div>
                <div className="text-xs text-gray-400">Contact</div>
                <div className="font-medium">{contact}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-3 text-gray-700">
            {desc || "No additional information provided."}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4 items-center">
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition font-medium ${
                likedBy.includes(user?.email) ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"
              }`}
            >
              <FcLike />
              <span>{likedBy.length}</span>
            </button>

            <button
              onClick={openAddComment}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Add Comment
            </button>

            {/* Food request button moved below comment & social */}
            <RequestFood item={food} currentUser={user} />

            <SocialShare url={window.location.href} title={name} />
          </div>

          {/* Comments */}
          <div className="mt-6">
            <CommentList
              comments={comments}
              onEdit={openEditComment}
              onDelete={handleDeleteComment}
              currentUserEmail={user?.email}
            />
          </div>
        </div>

        {/* Comment Modal */}
        {commentModalOpen && (
          <CommentModal
            open={commentModalOpen}
            onClose={() => setCommentModalOpen(false)}
            foodId={id}
            axiosSecure={axiosSecure}
            queryKey={["food", id]}
            editingComment={editingComment}
            currentUser={user}
            onDone={() => {
              setCommentModalOpen(false);
              setEditingComment(null);
            }}
          />
        )}
      </section>
    </Container>
  );
}
