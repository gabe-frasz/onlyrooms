import { db } from "@core/services";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

type QuestionType = {
  createdBy: string;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >[];
};

type FirebaseSnapshot = {
  createdBy: string;
  title: string;
  questions?: Record<
    string,
    {
      authotId: string;
      likes: Record<
        string,
        {
          authorId: string;
        }
      >[];
    }
  >;
};

export const useRoom = (roomID: string) => {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const roomRef = ref(db, `rooms/live-rooms/${roomID}`);

    try {
      onValue(roomRef, (snapshot) => {
        const roomData = snapshot.val() as FirebaseSnapshot;
        const questions = roomData.questions || [];

        console.log(questions);

        setRoomTitle(roomData.title);
        setCreatedBy(roomData.createdBy);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    return () => {
      off(roomRef, "value");
    };
  }, [roomID, user]);

  return { roomTitle, createdBy, questions, isLoading };
};