import { createClient } from "@/lib/supabaseServer";
import AnswerForm from "@/components/AnswerForm";
import AnswerList from "@/components/AnswerList";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const { id } = await params;

  const supabase = await createClient()

  // Get logged in user
  const { data: { user } } = await supabase.auth.getUser();

  const { data: question, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();


    console.log("Question ID:", id)
    console.log("Question:", question)
    console.log("Error:", error)

  const { data: answers } = await supabase
    .from("answers")
    .select("*")
    .eq("question_id", id)
    .order("accepted", { ascending: false }) // accepted first
    .order("created_at", { ascending: false });

  if (error || !question) {
    return <div className="p-6">Question not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">

      <h1 className="text-2xl font-bold">{question.title}</h1>

      <p className="text-gray-700">{question.description}</p>

      <div className="text-sm text-gray-500">
        Bounty: <span className="font-semibold">{question.bounty}</span>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold">Answers</h2>

      <div className="space-y-4">
        <AnswerList
          answers={answers}
          questionOwnerId={question.user_id}
        />
      </div>

      <AnswerForm questionId={question.id} />

    </div>
  );
}