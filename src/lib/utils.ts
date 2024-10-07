import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(from : Date){
  const currentDate = new Date();
  if(currentDate.getTime() - from.getTime() < 1000 * 60 * 60 * 24 ){
    return formatDistanceToNowStrict(from , {addSuffix : true}); // Suffix is like "in 5 minutes" or "5 minutes ago"
  } else{
    if(currentDate.getFullYear() == from.getFullYear()){
      formatDate(from , "MMM d");
    } else{
      formatDate(from , "MMM d, yyyy");
    }
  }
}