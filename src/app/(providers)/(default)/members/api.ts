import useCategoryStore from "@/store/category"
import { supabaseForClient } from "@/supabase/supabase.client"

export const getUsers = async ({
  pageParam,
  positionId,
}: {
  pageParam: number
  positionId?: string
}) => {
  const query = supabaseForClient
    .from("users")
    .select("*, position: positions(*)")
    .eq("user_status", "지원중")
    .range(pageParam!, pageParam! + 2)

  !!positionId && query.eq("positionId", positionId)

  const { data, error } = await query
  if (error) return console.log(error.message)

  return data || null
}

export const getPositions = async () => {
  const { data, error } = await supabaseForClient.from("positions").select("*")

  if (error) return console.log(error.message)

  return data
}

export const getPositionById = async ({
  positionId,
}: {
  positionId: string
}) => {
  const { data, error } = await supabaseForClient
    .from("positions")
    .select("*")
    .eq("id", positionId)

  if (error) return console.log(error.message)

  return data
}

export const getProjectByUserId = async (userId: string) => {
  const { data, error } = await supabaseForClient
    .from("projects")
    .select("*")
    .eq("user_id", userId)

  if (error) return console.log(error.message)

  return data
}

export const getTechsByUserId = async (userId: string) => {
  const { data, error } = await supabaseForClient
    .from("user_tech")
    .select("*, techs:techs(*)")
    .eq("user_id", userId)

  const techs = data?.map((tech) => {
    return tech.techs?.tech_name
  })

  if (error) return console.log(error.message)

  return techs
}
