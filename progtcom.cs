using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class progtcom : MonoBehaviour
{ private Rigidbody2D rigi;
    private void Start(){
        
        rigi= GetComponent<Rigidbody2D>();
    }
    public float vel;//variable de velocidad
    void Update()
    {
        mov();
        
    }
    void mov()//logica de movimiento
    {
       float movi= Input.GetAxis("Horizontal");
        rigi.velocity = new Vector2(movi * vel, rigi.velocity.y);
    }
}
