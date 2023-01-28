# exports each selected object into its own file

import bpy
import os

# export to blend file location
basedir = "A:/Website/public/models/"

view_layer = bpy.context.view_layer

obj_active = view_layer.objects.active

selections = []

def selectAllChildren(children):
    for obj in children:
        obj.select_set(True)
        selectAllChildren(obj.children)

for child in bpy.data.collections["Collection"].objects:
    bpy.ops.object.select_all(action='DESELECT')
    if child.parent == None:
        child.select_set(True)
        selectAllChildren(child.children)

        name = bpy.path.clean_name(child.name)
        fn = os.path.join(basedir, name)

        bpy.ops.export_scene.gltf(
            filepath=fn + ".glb",
            export_format="GLB",
            use_selection=True,
            export_yup=True,
            export_apply=True,
            export_draco_mesh_compression_enable=True,
            export_animations=True,
            export_frame_range=True,
            export_current_frame=True
        )
