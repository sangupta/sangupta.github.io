---
title: AutoCAD - Converting 3D polyline to 2D polyline
date: 27 Feb 2007
alias:
- /tech/autocad-converting-3d-polyline-to-2d.html
- /2007/02/autocad-converting-3d-polyline-to-2d.html
---

Almost all who are working in the field of engineering design and are using AutoCAD as 
their primary CAD software would have felt the need to convert a 3D polyline to a 2D 
polyline. In the field of Civil Engineering, survey drawings consists of hundreds, if not 
thousands, of 3D polylines. But a designer needs to convert them to 2D model to work and 
plan on that.

<!-- break here -->

It's a pity that AutoCAD (already into Release 18) has still not addressed this problem, 
and given a ready-to-use command. If they would have it would have been a boon for 
engineers. Most of us use some sort of customized scripts to acheive the job, and for 
those who do not do so already, here below is a LISP script which you can use to your 
free-will to do this haunting task.

```lisp
(defun c:d32 ()
  (command "OSNAP" "off")
  (setq i 0)
  (setq a (ssget))
  (repeat (sslength a)
    (setq lib '())
    (setq lib_f '())
    (setq b (ssname a i))
    (if	(= "POLYLINE" (cdr (assoc 0 (entget b))))
      (progn
	(setq enp (entget b))
	(setq en3 (cdr (setq en2 (assoc -1 enp))))
	(while (/= (setq ent (cdr (assoc 0 enp))) "SEQEND")
	  (if (= ent "VERTEX")
	    (setq lib (append lib (list (cdr (assoc 10 enp)))))
	  )
	  (setq enp (entget (setq en3 (entnext en3))))
	)
	(setq lib_f (append lib_f lib))
	(setq pt1 (list (car (nth 0 lib_f)) (cadr (nth 0 lib_f)) 0))
	(command "pline" pt1)
	(setq j 1)
	(while (nth j lib_f)
	  (setq pt2 (list (car (nth j lib_f)) (cadr (nth j lib_f)) 0))
	  (command pt2)
	  (setq pt1 pt2)
	  (setq j (+ j 1))
	)
	(command "")
      )
    )
    (if	(= "LWPOLYLINE" (cdr (assoc 0 (entget b))))
      (progn
	(setq enp (entget b))
	(repeat	(cdr (assoc 90 (entget b)))
	  (setq fi_p1 (assoc 10 enp))
	  (setq fi_p (cdr fi_p1))
	  (setq lib_f (append lib_f (list fi_p)))
	  (setq enp (subst '(777 . "bhut") fi_p1 enp))
	)
	(setq pt1 (list (car (nth 0 lib_f)) (cadr (nth 0 lib_f)) 0))
	(command "pline" pt1)
	(setq j 1)
	(while (nth j lib_f)
	  (setq pt2 (list (car (nth j lib_f)) (cadr (nth j lib_f)) 0))
	  (command pt2)
	  (setq pt1 pt2)
	  (setq j (+ j 1))
	)
	(command "")
      )
    )
    (if	(= "LINE" (cdr (assoc 0 (entget b))))
      (progn
	(setq st_pt (list (car (cdr (assoc 10 (entget b))))
			  (cadr (cdr (assoc 10 (entget b))))
		    )
	)
	(setq end_pt (list (car (cdr (assoc 11 (entget b))))
			   (cadr (cdr (assoc 11 (entget b))))
		     )
	)
	(command "LINE" st_pt end_pt "")
      )
    )
    (setq i (1+ i))
  )
  (command "erase" a "")
  (command "OSNAP" "midp,endp,center,perpendicular,nearest")
)
```

Load the script into AutoCAD and type `d32`, and select the 3D polyline. Voilla! its done! 
Yes, that's all you need to do.

Happy drafting!