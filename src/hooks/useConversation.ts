import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams<{ conversationId: string }>();

  const conversationId = useMemo(() => {
    if (!params.conversationId) {
      return "";
    }

    return params.conversationId;
  }, [params.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(() => {
    return {
      conversationId,
      isOpen,
    };
  }, [conversationId, isOpen]);
};

export default useConversation;
