
import Note from "../models/Note.js"
 
 export async function getAllNotes (_, res)  {
  try {
    const notes = await Note.find().sort({createdAt : -1})
    res.status(200).json(notes)
  } catch (error) {
     console.error("Error in getAllnotes controller", error);
    res.status(500).json({message:"Internal server error"});
  }

}

 export async function getNotebyid (req,res)  {
  try {
    const notes = await Note.findById(req.params.id)
    if(!notes) return res.status(404).json({message:"Note not found"})
    res.status(200).json(notes)
  } catch (error) {
     console.error("Error in getNotebyid controller", error);
    res.status(500).json({message:"Internal server error"});
  }

}

export async function createNote (req,res) {
  try {
    const {title, content} = req.body;
    const note = new Note({title ,content});

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createnotes controller", error);
    res.status(500).json({message:"Internal server error"});
  }
    
}

export async function updateNote(req,res) {
try {
  const {title,content}=req.body
  const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},
    {new:true});
  if(!updatedNote) return res.status(404).json({message:"Note not found"})
  res.status(200).json(updatedNote);
} catch (error) {
  console.error("Error in updatenote controller", error);
  res.status(500).json({message:"Internal server error"});
}
 
}

export async function deletenote(req,res){
 try {
  const deletedNote = await Note.findByIdAndDelete(req.params.id)
  if(!deletedNote) return res.status(404).json({message:"Note not found"})
    res.status(200).json({message:"Note deleted succssfully"});
 } catch (error) {
  console.error("Error in deletenote controller", error);
  res.status(500).json({message:"Internal server error"});
 }
}