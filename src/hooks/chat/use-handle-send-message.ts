import { useUpsertModelResponse } from "./upsert-model-response";
import { useUpsertUserInput } from "./upsert-user-input";
import { useSendMessage } from "./use-send-message";

export const useHandleSendMessage = () => {
  const upsertUserInput = useUpsertUserInput();
  const upsertModelResponse = useUpsertModelResponse();
  const sendMessage = useSendMessage();
  return async (
    input: string,
    conversationId?: string,
    isGenerateCode?: boolean
  ) => {
    const trimValue = input.trim();
    if (!trimValue) return;

    if (!isGenerateCode) upsertUserInput(trimValue, conversationId);

    const { data } = await sendMessage(
      trimValue,
      conversationId,
      isGenerateCode
    );

    if (data) upsertModelResponse(data, conversationId);

    return data;
  };
};
