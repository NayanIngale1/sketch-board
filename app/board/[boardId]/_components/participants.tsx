
import React from 'react'

const Participants = () => {
  return (
    <div
      className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md"
    >
      List of users
    </div>
  )
}

export default Participants


Participants.Skeleton = function ParticipantSkeleton() {
  return (
    <div
      className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]"
    />
  )
}