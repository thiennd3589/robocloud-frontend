import { useUpsertModelResponse } from "./upsert-model-response";
import { useUpsertUserInput } from "./upsert-user-input";
import { useSendMessage } from "./use-send-message";

export const useHandleSendMessage = () => {
  const upsertUserInput = useUpsertUserInput();
  const upsertModelResponse = useUpsertModelResponse();
  const sendMessage = useSendMessage();
  return async (input: string, conversationId?: string) => {
    const trimValue = input.trim();
    if (!trimValue) return;

    upsertUserInput(trimValue, conversationId);

    const { data } = await sendMessage(trimValue, conversationId);

    if (data) upsertModelResponse(data, conversationId);
  };
};
